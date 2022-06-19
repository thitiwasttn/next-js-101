import Link from "next/link";
import ImageComponent from "../components/ImageComponent";
import Head from "next/head";
import {useEffect, useState} from "react";
import Layout, {siteTitle} from "../components/Layout";
import utilStyles from '../styles/utils.module.css';
import {getSortedPostsData} from "../lib/post";
import {GetServerSideProps, GetStaticProps} from "next";
import Date2 from '../components/date'

type Prop = {
    allPostsData: any,
    date: string
}
export default function Home(myProp: Prop) {
    const [data2, setDate] = useState("");
    useEffect(() => {
        setDate(new Date().toTimeString());
    })
    return (
        <Layout home>
            {/* Keep the existing code here */}

            {/* Add this <section> tag below the existing <section> tag */}
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <h2>{myProp.date}</h2>
                <h3>{`${data2} `}</h3>
                <ul className={utilStyles.list}>
                    {myProp.allPostsData.map(({id, date, title}) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br/>
                            {
                                date ? <small className={utilStyles.lightText}>
                                    <Date2 dateString={date}/>
                                </small> : null
                            }

                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData();
    let date = new Date().toTimeString();
    return {
        props: {
            allPostsData,
            date
        },
    };
}

/*
export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    let date = new Date().toTimeString();
    return {
        props: {
            allPostsData,
            date
        },
    };
}*/
