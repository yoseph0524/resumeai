"use client";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";

const FileUploadModal = ({
  isOpen,
  onClose,
  makeTitle,
  changeTitle,
  onFileSelect,
  uploading,
  type,
}) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    onFileSelect(file); // Pass the selected file to the callback
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton
          style={{ backgroundColor: "lightblue", zIndex: 99 }}
        />
        <ModalBody>
          <div>
            <label>Title:</label>
            <Input
              placeholder="Enter title"
              type="text"
              onChange={changeTitle}
            />
          </div>
          {type === "analyze" ? (
            <>
              <ModalHeader>Upload File</ModalHeader>
              <ModalBody>
                <Input type="file" onChange={handleFileUpload} />
              </ModalBody>
              <ModalFooter>
                {uploading ? (
                  <Spinner size="xl" />
                ) : (
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Upload
                  </Button>
                )}
              </ModalFooter>
            </>
          ) : (
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={makeTitle}>
                Save
              </Button>
            </ModalFooter>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FileUploadModal;
