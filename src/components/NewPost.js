import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Avatar,
  TextField,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
  Divider,
} from "@material-ui/core";
import { BoldTypography } from "../shared/Typography";
import { colors } from "../shared/config";
import { useDispatch } from "react-redux";
import { newPost } from "../redux/actions/dataActions";
import styled from "styled-components";

const NewPostInfo = styled.div`
  display: flex;
`;

const NewPostUser = styled.div`
  display: flex;
  margin-left: 12px;
  flex-direction: column;
`;

const FormControlC = styled(FormControl)`
  min-width: 120px;
`;

const Suggested = styled(Typography)`
  margin-left: 2px;
  color: ${colors.mediumgray};
`;

const DialogTextField = styled(TextField)`
  background: ${colors.lightgray};
  padding: 5px 5px;
  border-radius: 5px;
`;

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 450px;
  margin-top: 20px;
`;

const PostBtn = styled(Button)`
  color: ${colors.black};
  font-size: 16px;
  font-weight: 600;
  width: 122px;
  height: 43px;
  background-color: ${colors.mediumgray};
`;

const NewPost = ({ open, handleClose }) => {
  const [industry, setIndustry] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Redux
  const dispatch = useDispatch();

  const handleIndustry = (e) => {
    setIndustry(e.target.value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    const post = {
      title,
      body: description,
      tags: [industry],
    };
    dispatch(newPost(post));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <BoldTypography sz={"18px"}>Create a Post</BoldTypography>
      </DialogTitle>

      <DialogContent>
        <NewPostInfo>
          <Avatar></Avatar>
          <NewPostUser>
            <BoldTypography sz={"16px"}>Claire Guo</BoldTypography>
            <FormControlC>
              <InputLabel>Industry</InputLabel>
              <Select value={industry} onChange={handleIndustry}>
                <Suggested>Suggested</Suggested>
                <MenuItem value={"Product Design"}>Product Design</MenuItem>
                <MenuItem value={"Product Management"}>
                  Product Management
                </MenuItem>
                <Divider />
                <MenuItem value={"Business"}>Business</MenuItem>
                <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
              </Select>
            </FormControlC>
          </NewPostUser>
        </NewPostInfo>
        <TextFieldWrapper>
          <DialogTextField
            autoFocus
            margin="dense"
            id="name"
            placeholder="Question / Subject"
            type="email"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
            onChange={handleTitle}
          />
          <DialogTextField
            placeholder="Description"
            rows={4}
            fullWidth
            multiline
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
              },
            }}
            onChange={handleDescription}
          />
        </TextFieldWrapper>
      </DialogContent>
      <DialogActions>
        <PostBtn onClick={handleSubmit} color="primary">
          Post
        </PostBtn>
      </DialogActions>
    </Dialog>
  );
};

export default NewPost;