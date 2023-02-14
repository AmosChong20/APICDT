import React from 'react'; 
import {
    AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  AlertDialogCloseButton,
  } from '@chakra-ui/react'


export default function Buttons({text,title,description,falsebutton,checkbutton}){

    //<CheckDialog text = "haha" title ="Discard Changes?" checkbutton ="确认" falsebutton ="取消"  description = "请检查清楚才点击“确认”，一旦提交就无法再做修改，也无法重新提交。"/>
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
        return (
            <>
            <Button colorScheme={'purple'} onClick={onOpen} ml={10} mt={'29'} h={'40px'} w={'120px'}>{`${text}`}</Button>
            <AlertDialog 
              isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
          >
              <AlertDialogOverlay>
              <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>{`${title}`}</AlertDialogHeader>
              <AlertDialogCloseButton />
                <AlertDialogBody>
                {`${description}`}
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                  {`${checkbutton} `}
                  </Button>
                  <Button colorScheme='red' onClick={onClose} ml={3}>
                  {`${falsebutton} `}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
            </>
        )
      }
