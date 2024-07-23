import {LockOutlined, SlackOutlined} from "@ant-design/icons"
import FormInput from "../../components/form/form-input";
import {Button, Form, message} from "antd";
import AuthLayout from "../../components/layout/auth-layout";
import {useHistory} from "react-router";
import {usePost} from "../../hooks/useApi";
import {useAuth} from "../../providers/AuthProvider";

interface FormData {
    username: string;
    password: string;
}

export default function LoginPage() {
    const history = useHistory()
    const auth = useAuth();
    const [form] = Form.useForm<FormData>();
    const {mutate, isPending: loading} = usePost({
        endpoint: "/login",
        name: "login",
        options: {
            onSuccess: (data:any) => {
                auth.login(data.user)
                history.push("/proyek")
            },
            onError: async (error:any) => {
                if(error?.response?.status === 500){
                    await message.error("Tidak dapat menghubungi server!")
                    return
                }
                await message.error("Username atau password salah!")
            }
        }
    });


    function handleSubmit(payload: FormData) {

        // @ts-ignore
        mutate({
            ...payload
        });
    }

    return <AuthLayout
        headerText={"Login"}
        headerIcon={<SlackOutlined className={"text-blue-500 text-[96px]"}/>}
        // footerIcon={<img
        //     src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-1vifkvbyOEZFb0YRoH_EZLSuNWEjiTgKYg&s"}
        //     className={"absolute bottom-4 text-red-500 w-full h-32 aspect-video "}
        //     alt={"Footer Logo"}
        // />}
    >
        <Form
            form={form}
            layout={"vertical"}
            className={""}
            onFinish={handleSubmit}
        >
            <div className={"!space-y-8 py-8"}>
                <div className={"!space-y-4"}>
                    <FormInput name={"username"} label={"Username"} size={"large"}/>
                    <FormInput name={"password"} label={"Password"} size={"large"} type={"password"}/>
                </div>
                <Button
                    size={"large"}
                    type={"primary"}
                    icon={<LockOutlined/>}
                    className={"w-full"}
                    htmlType={"submit"}
                    loading={loading}
                >Login</Button>
            </div>
        </Form>
    </AuthLayout>
}