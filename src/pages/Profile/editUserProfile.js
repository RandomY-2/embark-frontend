import React, { useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
  Input,
} from "@material-ui/core";
import { BoldTypography } from "../../shared/Typography";
import { colors } from "../../shared/config";
import {IndustryFilters} from "../../shared/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { editStudentDetails } from "../../redux/actions/userActions";
import styled from "styled-components";
import{
  ExploreObj,
  ExploreFilter,
  LinkedInIconC,
} from "./StyleProfile";
import {
  EditProfileContainer,
  EditProfileAvatar,
  ChangeAvatarLink,
  TitleContainer,
  EditProfileTitle,
  EditCoverImage,
  EditProfileContent,
  EditProfileDone,
  FormControlC,
  Suggested,
  DialogTextField,
  TextFieldWrapper,
  DoneBtn,
} from "./StyleEditProfile"
import lawn from "../../images/lawn.png";
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const EditProfile = ({ open, handleClose, handleIndustries }) => {
  const years = ["2021", "2022", "2023", "2024"];
  const industry = IndustryFilters;
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [major, setMajor] = useState(user.major)
  const [year, setYear] = useState(user.year)
  const [industries, setIndustries] = useState(user.tags? user.tags : [] );
  const [bio, setBio] = useState(user.bio);
  const [linkedin, setLinkedin] = useState(user.linkedIn); 

  // Redux
  const dispatch = useDispatch();
  const handleYear = (e) => {
    setYear(e.target.value);
  };
  const handleMajor = (e) => {
    setMajor(e.target.value);
  };


  const addIndustries = (e) => {
    // let curIndustries = industries.slice();
    // curIndustries.push(e.target.value)
    // setIndustries(curIndustries)
    console.log(e.target);
    setIndustries(e.target.value);
    //setIndustries([...industries, ...e.target.value])

  };

  const handlelinkedIn = (e) => {
    setLinkedin(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(industries);
    const updatedProfile = {
      name, 
      major, 
      year, 
      industries, 
      bio, 
      linkedin,
    };
    dispatch(editStudentDetails(updatedProfile));
    handleClose();
  };

  return (
    <EditProfileContainer open={open} onClose={handleClose}>
      <TitleContainer>
        <EditProfileTitle align="center" sz={"18px"}>Edit Profile</EditProfileTitle>
      </TitleContainer>

      <EditProfileContent>

          <EditProfileAvatar rounded></EditProfileAvatar>


      <ChangeAvatarLink fontColor="red" align="center">Change Profile Picture</ChangeAvatarLink>
      <TextFieldWrapper>
        <EditCoverImage src={lawn}></EditCoverImage>        
      </TextFieldWrapper>

      <ChangeAvatarLink align="center">Change Cover Photo</ChangeAvatarLink>
      <TextFieldWrapper>
        <BoldTypography  sz={"18px"}>Year:</BoldTypography>
        <FormControlC>
                <InputLabel>Year</InputLabel>
                <Select value={year} onChange={handleYear}>
                {years.map((y) => (
                    <MenuItem key={y} value={y} name="year">
                      {y}
                    </MenuItem>
                  ))}
                </Select>
              </FormControlC>        
      </TextFieldWrapper>

        <TextFieldWrapper>
        <BoldTypography  sz={"18px"}>Major:</BoldTypography>
          <DialogTextField
            autoFocus
            margin="dense"
            id="name"
            placeholder={user.major}
            type="email"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
            onChange={handleMajor}
          />          
        </TextFieldWrapper>
        
        <TextFieldWrapper>
        <BoldTypography  sz={"18px"}>Interested Industries:</BoldTypography>

        <ExploreFilter>
        {industries && industries.map((name) => (
          <ExploreObj bgcolor={colors.darkyellow}>
              &times; {name}
          </ExploreObj>           

                ))}
      </ExploreFilter>

        {/* <NewPostInfo> */}
          {/* <NewPostUser> */}
            <FormControlC>
              <InputLabel>Select all that apply</InputLabel>
              <Select 
              multiple 
              value={industries} 
              onChange={addIndustries}
              >
                <Suggested>Suggested</Suggested>
                {industry && industry.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked = {industries.indexOf(name)>-1} color="default"/>
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}

              </Select>
            </FormControlC>

          {/* </NewPostUser> */}
        {/* </NewPostInfo> */}
        </TextFieldWrapper>
          

        <TextFieldWrapper>
        <BoldTypography  sz={"18px"}>LinkedIn Profile (Optional):</BoldTypography>
          <DialogTextField
            autoFocus
            margin="dense"
            id="name"
            placeholder= {linkedin? linkedin :"Copy your Profile Link"}
            type="email"
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 16,
                fontWeight: 600,
              },
            }}
            onChange={handlelinkedIn}
          />          
        </TextFieldWrapper>
      </EditProfileContent>

      <EditProfileDone>
        <DoneBtn onClick={handleSubmit} >
          Done
        </DoneBtn>
      </EditProfileDone>

    </EditProfileContainer>
  );
};

export default EditProfile;
