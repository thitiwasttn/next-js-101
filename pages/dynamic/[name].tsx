import {useRouter} from 'next/router'
import Layout from "../../components/Layout";
import Head from "next/head";

const Post = () => {
    const router = useRouter()
    const {name} = router.query

    return <div>
        <Layout home={false}>
            <Head>
                <title>{name}</title>
            </Head>
            <p>Post : {name}</p>
        </Layout>
    </div>
}

export default Post