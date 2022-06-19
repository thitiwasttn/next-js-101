import Layout from "../../components/Layout";
import {GetStaticPaths, GetStaticProps} from "next";
import {getAllPostIds, getPostData, getSortedPostsData} from "../../lib/post";


export default function Post({postData}) {
    return <Layout home={false}>
        {postData.title}
        <br/>
        {postData.id}
        <br/>
        {postData.date}
    </Layout>;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    console.log('paths >> ', paths);
    let arr = [
        { params: { id: 'pre-rendering' } },
        { params: { id: 'ssg-ssr' } },
        { params: { id: '[id].tsx' } }
    ];

    return {
        paths: paths,
        fallback: false,
    };
}


export const getStaticProps: GetStaticProps = async ({params}) => {

    const postData = getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}
