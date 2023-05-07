import { FormLabel, Grid } from "@mui/material";
import Input from '@mui/joy/Input';

import TextareaAutosize from '@mui/base/TextareaAutosize';
import MyButton from "./Button";

const InputField = ({news, setNews}) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <TextareaAutosize
        aria-label="輸入框"
        placeholder="輸入新聞文章"
        style={{width: "90%", height:210, fontSize: 14}}
        value={news}
        onChange={setNews}
      />
    </Grid>
  );
}

const InputForm = ({formData, setFormData, handleClick}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Grid container justifyContent={"left"} alignItems={"center"} sx={{p: 3}}>
      <form onSubmit={handleSubmit} style={{width: "100%"}}>
        <FormLabel>標題</FormLabel>
        <Input
          name="title"
          value={formData.title || ''}
          onChange={setFormData}
          sx={{width: "25%"}}
        />
        <FormLabel>發佈時間</FormLabel>
        <Input
          name="released_time"
          value={formData.released_time || ''}
          onChange={setFormData}
          sx={{width: "25%"}}
        />
        <FormLabel>新聞文章</FormLabel>
        <Grid container alignItems="center">
          <TextareaAutosize
            aria-label="輸入框"
            name="news"
            placeholder="輸入新聞文章"
            value={formData.news}
            onChange={setFormData}
            style={{
              padding: "5px",
              width: "90%", height:210, fontSize: 14,
              overflow: "auto",
              border: "5px solid transparent",
              borderRadius: "15px"
            }}
          />
        </Grid>
        <Grid container justifyContent={"center"} sx={{paddingY: 3}}>
          <MyButton label={"建構知識圖譜"} onClick={handleClick}></MyButton>
        </Grid>
      </form>
    </Grid>
  );

}

export { InputField, InputForm};