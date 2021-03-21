import axios from "axios";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Audio from "../../components/audio";
import Swipeable from "react-swipy";
import Layout from "../../components/layout";
import Button from "../../components/button";

const moods = {
    happy: 'Пользователь кажется радостым c:',
    sad: 'Пользователь кажется грустным, подбодрите его',
    neutral: 'Пользователь нейтрален'
}

const App = () => {
  const [list, setList] = useState({
    isFetching: true,
    items: [],
  });
  const getItems = () => {
    axios({
      url: "/profile/list",
    }).then((res) => {
      if (res.data && res.data.success) {
        setList({
          isFetching: false,
          items: res.data.profiles,
        });
      }
    });
  };
  useEffect(getItems, []);
  const send = useCallback((dir) => {
    axios({
      url: `/match/${dir}`,
      params: {
        profile: list.items[0]._id
      }
    })
    setList((l) => ({
      isFetching: false,
      items: l.items.slice(1, l.items.length),
    }));
  }, [list])
  if (list.isFetching) {
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
    <Layout className="flex items-stretch overflow-hidden">
      <div className="relative w-full">
      <h1 className="font-bold text-3xl text-center mb-4">Поиск</h1>
        {list.items.length > 0 ? (
          <div className="flex flex-col">
            <Swipeable
              onSwipe={send}
              buttons={({ right, left }) => (
                <div className="absolute w-full bottom-0 flex justify-between">
                  <Button color="bg-red-500" colorDark="bg-red-500" text="text-white" textDark="text-white" className="px-4 rounded-full" onClick={left}>
                        <svg xmlns='http://www.w3.org/2000/svg' className="w-6 h-6" fill='currentColor' viewBox='0 0 512 512'><title>Heart Dislike</title><path d='M417.84 448a15.94 15.94 0 01-11.35-4.72L40.65 75.26a16 16 0 0122.7-22.56l365.83 368a16 16 0 01-11.34 27.3zM364.92 80c-48.09 0-80 29.55-96.92 51-16.88-21.48-48.83-51-96.92-51a107.37 107.37 0 00-31 4.55L168 112c22.26 0 45.81 9 63.94 26.67a123 123 0 0121.75 28.47 16 16 0 0028.6 0 123 123 0 0121.77-28.51C322.19 121 342.66 112 364.92 112c43.15 0 78.62 36.33 79.07 81 .54 53.69-22.75 99.55-57.38 139.52l22.63 22.77c3-3.44 5.7-6.64 8.14-9.6 40-48.75 59.15-98.8 58.61-153C475.37 130.52 425.54 80 364.92 80zM268 432C180.38 372.51 91 297.6 92 193a83.69 83.69 0 012.24-18.39L69 149.14a115.1 115.1 0 00-9 43.49c-.54 54.22 18.63 104.27 58.61 153 18.77 22.87 52.8 59.45 131.39 112.8a31.84 31.84 0 0036 0c20.35-13.81 37.7-26.5 52.58-38.11l-22.66-22.81C300.25 409.6 284.09 421.05 268 432z'/></svg>
                  </Button>
                  <Button color="bg-blue-500" colorDark="bg-blue-500" text="text-white" textDark="text-white" className="px-4 rounded-full" onClick={right}>
                  <svg xmlns='http://www.w3.org/2000/svg' className="w-6 h-6" viewBox='0 0 512 512'><title>Heart</title><path d='M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32'/></svg>
                  </Button>
                </div>
              )}
              onAfterSwipe={() => console.log()}
            >
              <Card item={list.items[0]} />
            </Swipeable>
            {list.items.length > 1 && (
              <Card style={{ zIndex: -1 }} item={list.items[1]} />
            )}
          </div>
        ) : <div className="flex h-full items-center justify-center">
                <span className="opacity-50 text-lg">Пусто</span>
            </div>}
      </div>
    </Layout>
  );
};

const Card = ({ item, style }) => (
  <div
    style={style}
    className="absolute bg-white dark:bg-black w-full p-4 shadow-lg rounded-xl border border-transparent dark:border-gray-800"
  >
    <div className="flex items-center mb-4">
      <div
        style={{ backgroundImage: `url(${item.user.avatar})` }}
        className="w-10 h-10 flex-none rounded-full bg-cover bg-center bg-gray-500"
      />
      <span className="ml-4 text-lg font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
        {item.user.name} {item.user.lastName}
      </span>
    </div>
    
    <Audio src={item.audio} id={item._id} />
    <span className="block text-sm font-semibold text-center opacity-60">{moods[item.mood]}</span>
  </div>
);

export default App;
