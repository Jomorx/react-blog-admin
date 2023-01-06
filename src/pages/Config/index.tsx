import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import MdEditor from "md-editor-rt";
import PageHeader from "@/component/PageHeader";
import style from "./index.module.less";
import { useParams } from "react-router-dom";
import { getConfigByIdApi, editConfigApi, IConfig } from "@/api/config";
function index() {
  const [initData, setInitData] = useState<IConfig>({
    configId: 0,
    configName: "",
    configContent: "",
  });
  const param = useParams();
  const publishConfig = () => {
    editConfigApi(initData);
  };
  const init = async () => {
    if (JSON.stringify(param) !== "{}") {
      const { data } = await getConfigByIdApi(Number(param.id));
      setInitData(data)
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <PageHeader title="发布文章"></PageHeader>
      <div
        style={{ display: "flex", alignItems: "center" }}
        className={style.title}
      >
        <span style={{ width: "60px" }}>标题:</span>
        <Input
          showCount
          maxLength={20}
          value={initData.configName}
          onChange={(e) => {
            setInitData({...initData,configName:e.target.value})
          }}
        />
        <Button size="large" danger className={style.button}>
          保存草稿
        </Button>
        <Button
          size="large"
          type="primary"
          danger
          className={style.button}
          onClick={() => {
            publishConfig();
          }}
        >
          发布文章
        </Button>
      </div>
      <MdEditor modelValue={initData.configContent} onChange={configContent=>setInitData({...initData,configContent})} />
    </>
  );
}

export default index;
