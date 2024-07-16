import { auth, db } from "@/app/firebase";
import { updateDoc, doc, getDocs, collection } from "firebase/firestore";
import { usePathname } from "next/navigation";

const getData = async (index) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const collectionRef = collection(db, "users", user.uid, "resume_data");
      const querySnapshot = await getDocs(collectionRef);
      if (!querySnapshot.empty) {
        if (index >= 0 && index < querySnapshot.docs.length) {
          const myData = querySnapshot.docs[index].data(); // Use the index to get the correct document
          console.log(myData);
          return myData;
        } else {
          console.log("Index out of range.");
          return null;
        }
      } else {
        console.log("No documents found in the collection.");
        return null;
      }
    } catch (error) {
      console.error("Error getting documents:", error);
      return null;
    }
  } else {
    console.log("No user is signed in.");
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
