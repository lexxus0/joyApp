import { createAsyncThunk } from "@reduxjs/toolkit";
import { Achievement } from "./slice";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";

export const addAchievementAsync = createAsyncThunk(
  "achievements/addAchievement",
  async (achievement: Achievement, thunkAPI) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("not authenticated");

      const docRef = doc(
        db,
        "users",
        user.uid,
        "achievements",
        achievement.id.toString()
      );

      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          ...achievement,
          completed: true,
          userId: user.uid,
        });
      }
      return { ...achievement, completed: true };
    } catch (error) {
      console.error("Error adding achievement:", error);
      return thunkAPI.rejectWithValue("Failed to add achievement");
    }
  }
);

export const fetchAchievements = createAsyncThunk(
  "achievements/fetchAchievements",
  async () => {
    const user = auth.currentUser;
    if (user) {
      const achievementsRef = collection(db, "users", user.uid, "achievements");
      const querySnapshot = await getDocs(achievementsRef);

      const achievements = querySnapshot.docs.map(
        (doc) => doc.data() as Achievement
      );

      return achievements || [];
    }
    return [];
  }
);
