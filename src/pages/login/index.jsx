import LoginForm from '../../components/LoginForm'
import { api } from '../../services/api'
import { Redirect } from '../../components/Router'
import Head from "next/head";

export default function Login({ logged }) {


    return (
        <>
            <Head>
                <title> Login </title>
            </Head>
            {!logged ? <LoginForm /> : <Redirect to={"/"} />}
        </>
    )
}

export async function getServerSideProps() {
    const response = await api.get(`user`);
    const data = [];
    response.data.map((el) => {
        if (el) {
            if (el.logged) {
                data.push(el)
            }
        }
    })

    return {
        props: {
            logged: data[0] && data[0].logged || false,
        },
    };
}