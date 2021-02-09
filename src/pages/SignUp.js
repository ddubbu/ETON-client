import React, { useEffect, useState } from 'react';
import '../styles/signUp.css'
import axios from 'axios';
import Logo from '../components/common/Logo';

const SignUp = (props) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const [validEmail, setValidEmail] = useState(true);
    const [validName, setValidName] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validPasswordCheck, setValidPasswordCheck] = useState(true);

    const [gitHubAccessToken, setGitHubAccessToken] = useState('');

    // 에러종류#############################

    //eamil
    const [emailLengthCheck, setEmailLengthCheck] = useState(true);    //길이
    const [emailScriptCheck, setEmailScriptCheck] = useState(true);    //스크립트 체크
    const [emailFormCheck, setEmailFormCheck] = useState(true);
    const [doEmailDuplicateCheck, setDoEmailDuplicateCheck] = useState(false);  //이메일 중복체크 했는지
    const [emailDuplicateCheck, setEmailDuplicateCheck] = useState(true);   //이메일 중복체크

    //name
    const [nameLengthCheck, setNameLengthCheck] = useState(true);      //길이
    const [nameScriptCheck, setNameScriptCheck] = useState(true);      //스크립트 체크

    //비밀번호
    const [passwordLengthCheck, setPasswordLengthCheck] = useState(true);   //길이
    const [passwordRegCheck, setPasswordRegCheck]  = useState(true)  //8글자이상, 하나이상의 숫자, 하나이상의 문자, 하나이상의 특수문자 들어갔는지


    //비밀번호 체크
    const [samePasswordCheck, setSamePasswordCheck] = useState(true);       //비밀번호와 같은지
    const [passwordCheckLengthCheck, setPasswordCheckLengthCheck] = useState(true); //비밀번호체크 한글자이상은 입력해야함.

    //duplicateErrorMessage //임시임. 나중에 고치자 useEffect Async더 공부해야함
    let duplicateErrorMessage = false;
    
    //메소드
    const handleEmail = (e) => {
        setEmail(e.target.value);

        //길이체크
        checkEmailLength(e.target.value.length);
        //스크립트 체크
        checkEmailScript(e.target.value);

        //이메일 형식 체크
        checkEmailForm(e.target.value);

        //이메일 중복 체크
        // checkEmailDuplicate(e.target.value);

        //전체 밸리드 인지
        // if(emailLengthCheck && emailScriptCheck && emailFormCheck){
        //     setValidEmail(true);
        // }else{
        //     setValidEmail(false);
        // }

        //리액트 훅스 스테이트가 바로 반영이 안되는 것 같아서 위의 주석처리된 메서드를 이렇게 바꿈. 나중에 스테이트를 쓸 수 있는 방향으로
        //리팩토링 할 수 있으면 리팩토링 ㄱㄱ. 밑에 메서드들도 전부 마찬가지.
        if(checkEmailLength(e.target.value.length) && checkEmailScript(e.target.value) && checkEmailForm(e.target.value)){
            setValidEmail(true);
        }else{
            setValidEmail(false);
        }

    }

    const handleName = (e) => {
        setName(e.target.value);

        checkNameLength(e.target.value.length);

        checkNameScript(e.target.value);

        if(checkNameLength(e.target.value.length) && checkNameScript(e.target.value)){
            setValidName(true);
        }else{
            setValidName(false);
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        
        checkPasswordLength(e.target.value.length);

        checkPasswordReg(e.target.value);

        if(checkPasswordLength(e.target.value.length) && checkPasswordReg(e.target.value)){
            setValidPassword(true);
        }else{
            setValidPassword(false);
        }      

        //비밀번호 체크를 먼저 입력하고 비밀번호를 입력할 경우, 같은지 아닌지를 체크해줘야 한다.
        checkSamePassword(e.target.value, passwordCheck);

        if(checkSamePassword(e.target.value, passwordCheck) && checkPasswordCheckLength(e.target.value.length)){
            setValidPasswordCheck(true);
        }else{
            setValidPasswordCheck(false);
        }
    }

    const handlePasswordCheck = (e) => {
        setPasswordCheck(e.target.value);

        checkSamePassword(e.target.value, password);

        checkPasswordCheckLength(e.target.value.length);

        if(checkSamePassword(e.target.value, password) && checkPasswordCheckLength(e.target.value.length)){
            setValidPasswordCheck(true);
        }else{
            setValidPasswordCheck(false);
        }
    }

    ///////////////////////////////// 공통메서드
    const lengthInvalidCheck = (target, min, max) => {
        if(target < min || target > max){
            return false;
        }
        return true;
    }

    const regCheck = (target, reg) => {
        if(reg.test(target)){
            return true;
        }else{
            return false;
        }
    }
    ////////////////////////////////개별 유효성 검사
    const checkEmailLength = (target) => {
        if(lengthInvalidCheck(target, 5, 20)){
            setEmailLengthCheck(true);
            return true;
        }else{
            setEmailLengthCheck(false);
            return false;
        }
    }
    
    const checkEmailScript = (target) => {
        const scriptCheck = /<(|\/|[^\/>][^>]+|\/[^>][^>]+)>/;
        if(!regCheck(target, scriptCheck)){
            setEmailScriptCheck(true);
            return true;
        }else{
            setEmailScriptCheck(false);
            return false;
        }
    }

    const checkEmailForm = (target) => {
        const emailCheck = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if(regCheck(target, emailCheck)){
            setEmailFormCheck(true);
            return true;
        }else{
            setEmailFormCheck(false);
            return false;
        }
    }

    const checkEmailDuplicate = (data) => {
        if(checkEmailLength(email)&&checkEmailForm(email)&&checkEmailScript(email)){
            setDoEmailDuplicateCheck(true);
            // axios.post('https://localhost:4000/users/signup/email',{
            axios.post('https://geteton.ga/users/signup/email',{
                email 
            })
            .then(res => {
                console.log("정상");
                setEmailDuplicateCheck(true);
                duplicateErrorMessage = true;
                return true;
            })
            .catch(err => {
                console.log("에러");
                setEmailDuplicateCheck(false);
                return false;
            })
        }else{
            alert('이메일 형식을 맞춰주세요');
            setValidEmail(false);
        }

    }

    const checkNameLength = (target) => {
        if(lengthInvalidCheck(target, 2, 20)){
            setNameLengthCheck(true);
            return true;
        }else{
            setNameLengthCheck(false);
            return false;
        }
    }

    const checkNameScript = (target) => {
        const scriptCheck = /<(|\/|[^\/>][^>]+|\/[^>][^>]+)>/;
        if(!regCheck(target, scriptCheck)){
            setNameScriptCheck(true);
            return true;
        }else{
            setNameScriptCheck(false);
            return false;
        }
    }

    const checkPasswordLength = (target) => {
        if(lengthInvalidCheck(target,8, 20)){
            setPasswordLengthCheck(true);
            return true;
        }else{
            setPasswordLengthCheck(false);
            return false;
        }
    }

    const checkPasswordReg = (target) => {
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/    //8글자이상, 하나이상의 숫자, 하나이상의 문자, 하나이상의 특수문자 들어갔는지
        if(regCheck(target, passRegex)){
            setPasswordRegCheck(true);
            return true;
        }else{
            setPasswordRegCheck(false);
            return false;
        }
    }

    const checkSamePassword = (source, target) => {
        if(source === target){
            setSamePasswordCheck(true);
            return true;
        }else{
            setSamePasswordCheck(false);
            return false;
        }
    }

    const checkPasswordCheckLength = (target) => {
        if(target >= 1){
            setPasswordCheckLengthCheck(true);
            return true;
        }else{
            setPasswordCheckLengthCheck(false);
            return false;
        }
    }

    ///////////////전체 유효성 검사
    const checkValidEmail = () => {
        // if(checkEmailLength(email.length) && checkEmailScript(email) && checkEmailForm(email)){
        //     setValidEmail(true);
        // }else{
        //     setValidEmail(false);
        // }

        //서브밋버튼을 눌렀을 때 모든 에러메세지를 보여주고 싶어서 아래와 같이 함. 나중에 리팩토링 할수 있으면 리팩토링. 밑의 메서드들도 다 마찬가지.
        let flag = true;
        if(checkEmailLength(email.length)){
            flag = flag && true;
        }else{
            flag = flag && false;
        }

        if(checkEmailScript(email)){
            flag = flag && true;
        }else{
            flag = flag && false;
        }

        if(checkEmailForm(email)){
            flag = flag && true;
        }else{
            flag = flag && false;
        }

        // flag = checkEmailDuplicate(email) ? flag = flag&&true : flag = flag&&false;
        if(doEmailDuplicateCheck){
            flag = emailDuplicateCheck ? flag = flag&&true : flag = flag&&false;
            // flag = checkEmailDuplicate(email) ? flag = flag&&true : flag = flag&&false; //이렇게 하면 제대로 작동 안된다. 비동기 때문인듯
            
        }else{
            if(!duplicateErrorMessage){
              alert('이메일 중복확인을 해주세요');
              duplicateErrorMessage = true;
            }
            
            flag = flag && false;
        }

        if(flag){
            setValidEmail(true);
            return true;
        }else{
            setValidEmail(false);
            console.log("=======",validEmail);
            return false;
        }
    }

    const checkValidName = () => {
        let flag = true;

        if(checkNameLength(name.length)){
            flag = flag && true;
        }else{
            flag = flag && false;
        }

        if(checkNameScript(name)){
            flag = flag && true;
        }else{
            flag = flag && false;
        }

        if(flag){
            setValidName(true);
            return true;
        }else{
            setValidName(false);
            return false;
        }
    }

    const checkValidPassword = () => {
        let flag = true;
        flag = checkPasswordLength(password.length) ? flag && true : flag && false;
        flag = checkPasswordReg(password) ? flag && true : flag && false;

        if(flag){
            setValidPassword(true);
            return true;
        }else{
            setValidPassword(false);
            return false;
        }
    }

    const checkValidPasswordCheck = () => {
        let flag = true;
        flag = checkSamePassword(password,passwordCheck) ? flag && true : flag && false;
        flag = checkPasswordCheckLength(passwordCheck.length) ? flag && true : flag && false;

        if(flag){
            setValidPasswordCheck(true);
            return true;
        }else{
            setValidPasswordCheck(false);
            return false;
        }
    }

    const submit = () => {
        checkValidEmail();
        checkValidName();
        checkValidPassword();
        checkValidPasswordCheck();

        // if(validEmail && validName && validPassword && validPasswordCheck){
        if(checkValidEmail() && checkValidName() && checkValidPassword() && checkValidPasswordCheck()){
            //제출
            console.log("제출가능");
            axios.post('https://geteton.ga/users/signup',{
              email,
              password,
              username : name
            })
            .then(res => {
              console.log(res.data);
              props.history.push('/users/signin')
            })
            .catch(err => {
              console.log("ERR : ", err);
            })
        }else{
            console.log("제출불가");
        }
    }
    
    //social sign up
    const socialSignUp = (e) => {
        
        if(e.target.textContent.includes('GitHub')){
            window.location.assign('https://github.com/login/oauth/authorize?client_id=b7cf6608d7fdc7e57bce');
        }
    }

    useEffect(() => {
        console.log("use Effect");
        const url = new URL(window.location.href);
        const authorizationCode = url.searchParams.get('code');
        if(authorizationCode){
            getAccessToken(authorizationCode);
        }
    })

    const getAccessToken = (authorizationCode) => {
        console.log("getAccessToken!");
        axios.post('http://localhost:5000/users/signup/oauth',{
            authorizationCode
        },{
            withCredentials : true
        })
        //여기서 서버로 인증코드 (authorizationCode)를 보내주면 서버에서 액세스 토큰을 요청하고, 액세스 토큰을 클라이언트로 바로 반환해 주는 것이 아니라 받은 액세스 토큰을 가지고
        //다시 깃헙 사이트에 요청을 해서 정보를 받아온다. 그리고 받은 정보를 바탕으로 회원가입을 시킨다.(데이터베이스에 정보를 넣는다).
        //여기까지 성공적으로 진행되었다면 성공적으로 잘 됬다는 리스폰스를 보내준다. 그리고 클라이언트는 인트로 페이지로.
    }

    return(
        <div className = "signUpContainer">
            
            <div className = "signUpDiv">
                <div>
                <Logo /><br/>
                </div>
                {/* <div className = "socialLoginDiv">
                    <button onClick = {socialSignUp}>GitHub</button>
                </div> */}
                <div className = {`email inputDiv ${validEmail ? "" : 'validError'}`}>
                    <div className = "inputSection">
                        <span className = "item">Email</span>
                        
                            <input type = "text"
                                    className = "emailInput"
                                    onChange = {handleEmail}
                                    value = {email}
                            />
                        <div className="duplicateCheck">
                            <button onClick={checkEmailDuplicate}>중복확인</button>
                            {doEmailDuplicateCheck ? (emailDuplicateCheck ? "✔️사용가능한 이메일입니다" : "✔️중복된이메일입니다") : ""}
                        </div>
                    </div>
                    <div className = "errorSection">
                        <div className = {`errorMessage ${emailLengthCheck ? 'inactiveErrorMessage' : 'activeErrorMessage'}`}>✔️5글자 이상, 20글자 이하로 해주세요.</div>
                        <div className = {`errorMessage ${emailFormCheck ? 'inactiveErrorMessage' : 'activeErrorMessage'}`}>✔️이메일 형식에 맞게 써주세요</div>
                        {/* <div className = {`errorMessage ${emailDuplicateCheck ? 'inactiveErrorMessage' : 'activeErrorMessage'}`}>✔️중복된 이메일 입니다</div> */}
                        <div className = {`errorMessage ${emailScriptCheck ? 'inactiveErrorMessage' : 'activeErrorMessage'}`}>✔️스크립트 쓰지 마세요🤖</div>
                    </div>
                </div>
                <div className = {`name inputDiv ${validName ? "" : "validError"}`}>
                    <div className = "inputSection">
                        <span className="item">Name</span> 
                        <input type="text"
                                className = "nameInput"
                                onChange = {handleName}
                                value = {name}
                        />
                    </div>
                    <div className = "errorSection">
                        <div className = {`errorMessage ${nameLengthCheck ? 'inactiveErrorMessage' : 'activeErrorMessage'}`}>✔️2글자 이상, 20글자 이하로 해주세요</div>
                        <div className = {`errorMessage ${nameScriptCheck ? 'inactiveErrorMessage' : 'activeErrorMessage'}`}>스크립트 쓰지 마세요🤖</div>
                    </div>
                </div>
                <div className = {`password inputDiv ${validPassword ? '' : 'validError'}`}>
                    <div className = "inputSection">
                        <span className="item">Password</span> 
                        <input type = "password"
                                className = "passwordInput"
                                onChange = {handlePassword}
                                value = {password}
                        />
                    </div>
                    <div className = "errorSection">
                        <div className = {`errorMessage ${passwordLengthCheck ? 'inactiveErrorMessage' : 'activeErrorMessage'}`}>✔️8글자 이상, 20글자 이하로 해주세요</div>
                        <div className = {`errorMessage ${passwordRegCheck ? 'inactiveErrorMessage' : 'activeErrorMessage'}`}>✔️문자, 숫자, 특수문자가 각각 하나이상 들어가야 합니다.</div>
                    </div>
                </div>
                <div className = {`passwordCheck inputDiv ${validPasswordCheck ? '' : 'validError'}`}>
                    <div className = "inputSection">
                        <span className="item">Password Check</span>
                        <input type = "password"
                                className = "passwordCheckInput"
                                onChange = {handlePasswordCheck}
                                value = {passwordCheck}
                        />
                    </div>
                    <div className = "errorSection">
                        <div className = {`errorMessage ${samePasswordCheck ? 'inactiveErrorMessage' : 'activeErrorMessage'}`}>같은 비밀번호를 써주세요</div>
                        <div className = {`errorMessage ${passwordCheckLengthCheck ? 'inactiveErrorMessage' : 'activeErrorMessage'}`}>입력해주세요</div>
                    </div>
                </div>
                <div className = "submitButtonDiv">
                    <button
                        className = "submitButton" 
                        onClick = {submit}>Sign Up</button>
                </div>
            </div>
            
        </div>
    )
}

export default SignUp;