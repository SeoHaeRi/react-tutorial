import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import firebase from "../../firebase";
import md5 from "md5"; //유니크한 값을 가지려고

function RegisterPage() {
  const { register, watch, errors, handleSubmit } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false); //user 생성 중 버튼 누르지 못하게

  const password = useRef(); //함수형 컴포넌트에서 Dom 선택
  password.current = watch("password");

  //submit 했을 때 (async - await 적용하여 비동기처리 효율적으로)
  const onSubmit = async (data) => {
    //try-catch 로 error 화면에 표시
    try {
      setLoading(true); //Loading state
      //firebase와 HTTP 통신을 하는 곳에 await 붙이기
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);
      console.log("createdUser", createdUser);

      //user 정보 업데이트
      await createdUser.user.updateProfile({
        //updateProfile : firebase method
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(
          createdUser.user.email
        )}?d=identicon`,
      });

      //Firebase 데이터베이스에 저장해주기
      //"users" : Collection(Table) 이름
      //그 아래 (child)에 uniq한 값
      await firebase.database().ref("users").child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL,
      });

      setLoading(false);
    } catch (error) {
      setErrorFromSubmit(error.message);
      setLoading(false);
      //5초 후 에러문구 사라지게
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };

  return (
    <div className="auth-wrapper">
      {/*Register page의 css적용하려고 className 추가*/}

      <div style={{ textAlign: "center" }}>
        <h3>Register</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This email field is required</p>}

        <label>Name</label>
        <input name="name" ref={register({ required: true, maxLength: 10 })} />
        {errors.name && errors.name.type === "required" && (
          <p>This name field is required</p>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <p>Your input exceed maximum length</p>
        )}

        <label>Password</label>
        <input
          name="password"
          type="password" //비밀번호 안보이게 type 지정
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>This password field is required</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p>Password must have at least 6 characters</p>
        )}

        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          ref={register({
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === "required" && (
            <p>This password confirm field is required</p>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === "validate" && (
            <p>The passwords do not match</p>
          )}

        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        {/*disabled = true : 클릭X */}
        <input type="submit" disabled={loading} />
        <Link style={{ color: "gray", textDecoration: "none" }} to="login">
          이미 아이디가 있다면...{" "}
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
