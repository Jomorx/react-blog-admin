import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { getArticleList } from "@/store/articleStore";
import { shallowEqual } from "react-redux";
import style from "./index.module.less";
const index = () => {
  const store = useAppSelector((state)=>({articleList:state.articleStore.articleList}),shallowEqual)
  const dispatch = useAppDispatch()
  return (
    <>
    <h1>{JSON.stringify(store.articleList)}</h1>
    <button onClick={e=>dispatch(getArticleList([1,10,""]))}></button>
      <div className={style.card_container}>
        {
          [1,2,3,4].map(item=><div key={item} className={style.card}>{item}</div>)
        }
        
      </div>
    </>
  );
};

export default index;