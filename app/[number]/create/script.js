import { auth, db } from "@/app/firebase";
import {
  updateDoc,
  doc,
  getDocs,
  collection,
  getDoc,
} from "firebase/firestore";
import { usePathname } from "next/navigation";

const getData = async (id) => {
  const user = auth.currentUser;

  if (user && id) {
    try {
      const docRef = doc(db, "users", user.uid, "resume_data", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const myData = docSnap.data();
        console.log(myData);
        return myData;
      } else {
        console.log("No such document.");
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      return null;
    }
  } else {
    console.error("User is not signed in or ID is not provided.");
    return null;
  }
};

export function getNumber() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const number = segments[1];
  return number;
}

export default getData;
