export type TodayPresenter = {
    id: number; //発表者id(発表順にふる)
    name: string; //発表者名
    privateMemo: string; //PrivateMemo
    chats: string[]; //PublicMemo
};