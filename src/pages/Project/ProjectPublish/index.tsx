import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import MdEditor from "md-editor-rt";
import PageHeader from "../../../component/PageHeader";
import style from "./index.module.less";
import "md-editor-rt/lib/style.css";
import ModalForm from "@/component/ModalForm";
import { ModalInfoType } from "@/component/ModalForm/types";
import { useParams } from "react-router-dom";
import { getProjectByIdApi, updateProjectApi, uploadProjectApi } from "@/api/ProjectApi";
function index() {
  const [title, setTitle] = useState("hello");
  const [text, setText] = useState("hello md-editor-rt!");
  const [visible, setVisible] = useState<boolean>(false);
  const [initValue, setInitValue] = useState<any>();
  const param = useParams();
  const modalInfo: ModalInfoType = {
    onCreate: async (value) => {
      if (JSON.stringify(param) === '{}') {
        const res = await uploadProjectApi({
          ...value,
          projectName: title,
          projectDescription: text,
        });
      } else {
        await updateProjectApi({
          projectId: initValue?.projectId,
          ...value,
          projectName: title,
          projectDescription: text,
        });
      }
      setVisible(false);
    },
    onCancel: () => {
      setVisible(false);
    },
    formItem: [
      {
        label: "上传封面",
        name: "projectCover",
        type: "upload",
        rules: [
          {
            required: true,
            message: "请上传封面",
          },
        ],
        valuePropName: "src",
        getValueFromEvent: (e: any) => {
          console.log("Upload event:", e.file.status);
          if (e.file.status === "done") {
            return e?.file.response[0].src;
          }
        },
        initialValue: initValue?.projectCover,
      },
    ],
    title: "发布项目",
  };
  const publishArticle = () => {
    setVisible(true);
  };

  useEffect(() => {
      if (initValue !== undefined) {
        setText(initValue.projectDescription);
        setTitle(initValue.projectName);
      }
  }, [initValue]);
  const init = async () => {
    if(JSON.stringify(param) !== '{}'){
      const res = await getProjectByIdApi(param.id);
      setInitValue(res as any);
    }

  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <PageHeader title="发布项目"></PageHeader>
      <div
        style={{ display: "flex", alignItems: "center" }}
        className={style.title}
      >
        <span style={{ width: "60px" }}>标题:</span>
        <Input
          showCount
          maxLength={20}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
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
            publishArticle();
          }}
        >
          发布项目
        </Button>
      </div>
      <MdEditor modelValue={text} onChange={setText} />
      <ModalForm visible={visible} ModalInfo={modalInfo}></ModalForm>
    </>
  );
}

export default index;
