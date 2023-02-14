import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Flex,
  } from '@chakra-ui/react'

function AlertDialog({ status, description }) {
    return (
        <Flex justifyContent={'center'}>
            <Alert status={status} w={'50vw'} color='black'>
                <AlertIcon />
                <AlertTitle>{status}</AlertTitle>
                <AlertDescription>{description}</AlertDescription>
            </Alert>
        </Flex>
    )
}

export default AlertDialog;