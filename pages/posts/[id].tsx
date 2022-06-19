import Layout from "../../components/Layout";
import {GetStaticPaths, GetStaticProps} from "next";
import {getAllPostIds, getPostData, getSortedPostsData} from "../../lib/post";
import Date from '../../components/date'
import Head from "next/head";
import utilStyles from '../../styles/utils.module.css';


export default function Post({postData}) {
    return (
        <Layout home={false}>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    console.log('paths >> ', paths);
    let arr = [
        { params: { id: 'pre-rendering' } },
        { params: { id: 'ssg-ssr' } },
        // { params: { id: '[id].tsx' } }
    ];

    return {
        paths: arr,
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
