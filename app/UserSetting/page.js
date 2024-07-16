"use client";
// Chakra UI Imports ;
import { Box, Flex, IconButton } from "@chakra-ui/react";

// Saas UI Imports ;
import {
  Persona,
  Form,
  FormLayout,
  Field,
  SubmitButton,
  PersonaAvatar,
  PersonaDetails,
  PersonaLabel,
  PersonaSecondaryLabel,
} from "@saas-ui/react";

import { useEffect, useState } from "react";
import { auth, db } from "@/app/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  onAuthStateChanged,
  updatePassword,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { ArrowBackIcon } from "@chakra-ui/icons";

const UserSetting = () => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(0);

  const [user, setUser] = useState(null);
  const [formChanged, setFormChanged] = useState(false);

  const buttonStyles = {
    ...(isButtonEnabled
      ? {
          color: "#fff", // White text for enabled state
          background: "linear-gradient(to right, #FF0080, #b742ff)",
        }
      : {
          backgroundColor: "#e0e0e0", // Light gray for disabled state
          color: "#a0a0a0", // Light gray text for disabled state
          cursor: "not-allowed", // Change cursor to not-allowed for disabled state
        }),
  };

  const checkPasswordRequirements = (password) => {
    const requirements = [
      /.{8,}/, // Minimum length of 8 characters
      /[A-Z]/, // Contains an uppercase letter
      /[a-z]/, // Contains a lowercase letter
      /[0-9]/, // Contains a number
      /[!@#\$%\^\&*\)\(+=._-]/, // Contains a special character
    ];

    return requirements.map((regex) => regex.test(password));
  };

  const isValidPassword = (password) => {
    return checkPasswordRequirements(password).every((req) => req);
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User authenticated");
        setUser(user);
      } else {
        console.log("User not authenticated");
      }
    });

    return () => listen();
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(user.email);
      } else {
        console.log(user.uid + ": No such document!");
      }
    };

    if (user) {
      getUserInfo();
    }
  }, [user]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsMatch(e.target.value === confirmPassword);

    if (e.target.value === confirmPassword) {
      setIsButtonEnabled(isValidPassword(e.target.value));
    } else {
      setIsButtonEnabled(false);
    }

    setFormChanged(true); // Mark form as changed
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsMatch(e.target.value === password);

    if (e.target.value === password) {
      setIsButtonEnabled(isValidPassword(e.target.value));
    } else {
      setIsButtonEnabled(false);
    }

    setFormChanged(true); // Mark form as changed
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setFormChanged(true); // Mark form as changed
    setIsButtonEnabled(true);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setFormChanged(true); // Mark form as changed
    setIsButtonEnabled(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFormChanged(true); // Mark form as changed
    setIsButtonEnabled(true);
  };

  const handleSubmit = async (e) => {
    try {
      if (password) {
        await updatePassword(user, password);
        setPassword("");
        setConfirmPassword("");
        setPasswordChanged(1);
      }

      if (firstName || lastName) {
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });

        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          first_name: firstName,
          last_name: lastName,
        });
      }

      if (email && email !== user.email) {
        await updateEmail(user, email);
      }

      alert("Profile updated successfully");
      setFormChanged(false); // Reset form changed status
    } catch (error) {
      setPasswordChanged(2);
      console.error("Error updating profile:", error);
    }
  };

  const router = useRouter();

  const handleBackClick = () => {
    router.push("/Dashboard");
  };

  return (
    <>
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="Back to Dashboard"
        onClick={handleBackClick}
        position="absolute"
        top="16px"
        left="16px"
        backgroundColor="transparent"
        _hover={{ backgroundColor: "gray.200" }}
      />
      <Box padding="8">
        <Flex alignItems="start" marginBlock="4">
          <Persona>
            <PersonaAvatar name={`${firstName} ${lastName}`} marginRight={3} />
            <PersonaDetails>
              <PersonaLabel>{`${firstName} ${lastName}`}</PersonaLabel>
              <PersonaSecondaryLabel>Basic User</PersonaSecondaryLabel>
            </PersonaDetails>
          </Persona>
        </Flex>

        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <Field
              backgroundColor="#D3D3D3"
              textColor="black"
              name="firstName"
              label="First Name"
              value={firstName}
              width="20.5em"
              onChange={handleFirstNameChange}
            />
            <Field
              backgroundColor="#D3D3D3"
              textColor="black"
              name="lastName"
              label="Last Name"
              value={lastName}
              width="20.5em"
              onChange={handleLastNameChange}
            />
            <Field
              backgroundColor="#D3D3D3"
              textColor="black"
              name="email"
              label="Email"
              value={email}
              type="email"
              width="20.5em"
              onChange={handleEmailChange}
            />
            <Field
              fontFamily="mono"
              backgroundColor="white"
              textColor="black"
              type="password"
              name="password"
              label="New Password"
              value={password}
              width="18em"
              onChange={handlePasswordChange}
            />
            <Field
              fontFamily="mono"
              backgroundColor="white"
              textColor="black"
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              width="18em"
              onChange={handleConfirmPasswordChange}
            />
            {!isMatch && <p className="highlight">Passwords do not match</p>}
            {!isButtonEnabled && (
              <div>
                <p>Password must:</p>
                <ul style={{ marginLeft: "25px" }}>
                  <li>Be at least 8 characters long</li>
                  <li>Have 1 uppercase letter</li>
                  <li>Have 1 lowercase letter</li>
                  <li>Have 1 special symbol (!@#$%^&*)(+=._-)</li>
                </ul>
              </div>
            )}
            {passwordChanged === 1 && (
              <p style={{ color: "#4caf50" }}>Successfully changed password</p>
            )}
            {passwordChanged === 2 && (
              <p style={{ color: "red" }}>
                Error changing password, try logging out and logging back in
              </p>
            )}
            <SubmitButton
              marginBlockStart="10px"
              style={buttonStyles}
              isDisabled={!formChanged}
            >
              Save
            </SubmitButton>
          </FormLayout>
        </Form>
      </Box>
    </>
  );
};

export default UserSetting;
