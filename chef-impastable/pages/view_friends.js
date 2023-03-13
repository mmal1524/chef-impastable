import Navbar from './navbar.js'
import * as React from 'react';
import User from '../components/user';
import { currUser } from '../components/user';
import { useState, useEffect } from "react";
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useRef } from 'react';
import { friendCardTwo } from '../components/friend-card-2.js';
import { addFriendCard } from '../components/add-friend-card.js';
import clientPromise from '../lib/mongodb_client';
import { useRouter } from "next/router";


// edge cases to consider: adding myself, adding friends already in my friend list, inputing invalid user, 


export default function ViewFriends() {
    const [username, setUsername] = useState("");
    var [displayName, setDisplayName] = useState("");
    var [avatar, setAvatar] = useState("");
    //var [friends, setFriends] = useState([]);
    //var [friendRequests, setFriendRequests] = useState("");
    var [createdPrivacy, setCreatedPrivacy] = useState("");
    var [savedPrivacy, setSavedPrivacy] = useState("");
    var [reviewedPrivacy, setReviewedPrivacy] = useState("");
    var [mealPlanPrivacy, setMealPlanPrivacy] = useState("");

    useEffect(() => {
      var thisUser = JSON.parse(localStorage.getItem('user'));
      Object.defineProperties(thisUser, {
          getUsername: {
              get() {
                  return this.username
              },
          },
          getDisplayName: {
              get() {
                  return this.displayName
              },
          },
          getAvatar: {
              get() {
                  return this.avatar
              },
          },
          getFriends: {
              get() {
                  return this.friends
              },
          },
          getFriendRequests: {
              get() {
                  return this.friendRequests
              },
          },
          getCreatedPrivacy: {
              get() {
                  return this.createdPrivacy
              },
          },
          getSavedPrivacy: {
              get() {
                  return this.savedPrivacy
              },
          },
          getReviewedPrivacy: {
              get() {
                  return this.reviewedPrivacy
              },
          },
          getMealPlanPrivacy: {
              get() {
                  return this.mealPlanPrivacy
              }
          }
      });
      setUsername(thisUser.getUsername);
      setDisplayName(thisUser.getDisplayName);
      setAvatar(thisUser.getAvatar);
      setFriends(thisUser.getFriends);
      setFriendRequests(thisUser.getFriendRequests);
      setCreatedPrivacy(thisUser.getCreatedPrivacy);
      setSavedPrivacy(thisUser.getSavedPrivacy);
      setReviewedPrivacy(thisUser.getReviewedPrivacy);
      setMealPlanPrivacy(thisUser.getMealPlanPrivacy)
  }, []);


    const router = useRouter();

    return (
        <div>
            <div>
                <Navbar /> 
            </div>
        </div>
    );

}