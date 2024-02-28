import AuthTitle from '@/components/authTitle/authTitle'
import PrimaryBtn from '@/components/primaryBtn/PrimaryBtn'
import "../../app/globals.scss";

const forgetPass = () => {
    return (
        <div className='m-auto flex flex-col justify-center mt-[200px] items-center  h-full'>

            <div className="shadow-card  p-[30px] w-full m-auto pb-p_153 lg:pb-p_236 pt-p_173 lg:pt-p_276 max-w-authWidth mx-auto">
                <AuthTitle>Forgot Password</AuthTitle>
                <p className="mt-2 lg:mt-3 mb-5 lg:mb-10 text-base font-normal text-[#78716C]">
                    A link will be sent to your registered email to reset your password.
                </p>

                <form className='auth_layout'> 
                    <div className="mb-5 lg:mb-10">
                        <label htmlFor="email">
                            Email <span>(Required)</span>
                        </label>
                        <input type="email" id="email" />
                    </div>
                    <PrimaryBtn>Send Rest Link</PrimaryBtn>
                </form>
            </div>

        </div>
    )
}

export default forgetPass