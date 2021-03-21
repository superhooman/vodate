import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout';
import GlobalContext from '../../utils/globalContext';

const Matches = () => {
    const [matches, setMatches] = useState({
        isFetching: true,
        items: []
    })
    const global = useContext(GlobalContext);
    useEffect(() => {
        if(!global.user){
            return;
        }
        axios({
            url: '/match/my'
        }).then((res) => {
            if (res.data && res.data.success) {
                setMatches({
                    isFetching: false,
                    items: res.data.matches.map((m) => m.users.filter(el => el.id !== global.user.id)[0])
                })
            }
        })
    }, [global.user])
    if (matches.isFetching) {
        return (
            <Layout className="flex items-center justify-center">
                <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            </Layout>
        );
    }
    return (
        <Layout>
            <h1 className="font-bold text-3xl text-center mb-4">Пары</h1>
            <div className="divide-y divide-gray-300 dark:divide-gray-700">
                {matches.items.map((el) => (
                    <a className="flex items-center w-full py-2" href={`https://i2.app.link/open_chat_with?user_id=${el.id}`}>
                        <div
                            style={{ backgroundImage: `url(${el.avatar})` }}
                            className="w-12 h-12 flex-none rounded-full bg-cover bg-center bg-gray-500"
                        />
                        <span className="ml-4 text-lg font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {el.name} {el.lastName}
                        </span>
                    </a>
                ))}
            </div>
            {matches.items.length === 0 ? <div className="flex my-24 items-center justify-center">
                <span className="opacity-50 text-lg">Пусто</span>
            </div> : null}
        </Layout>
    )
}

export default Matches;