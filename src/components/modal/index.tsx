import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalBody,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    Text,
    Button,
    Flex,
 } from "@chakra-ui/react";
 import { FiUser, FiScissors } from "react-icons/fi";
 import { FaMoneyBillAlt } from "react-icons/fa";
import { ScheduleItem } from "@/pages/dashboard";

 interface ModalInfoProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    data: ScheduleItem;
    finishService: () => Promise<void>;
 }

export function ModalInfo({ data, finishService, isOpen, onClose, onOpen }: ModalInfoProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="barber.400" color="white">
                <ModalHeader>Próximo</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Flex align="center" mb={5}>
                        <FiUser size={28} color="#FF813e"/>
                        <Text ml={3}>{data?.customer}</Text>
                    </Flex>

                    <Flex align="center" mb={5}>
                        <FiScissors size={28} color="#FFF"/>
                        <Text ml={3}>{data?.haircut?.name}</Text>
                    </Flex>

                    <Flex align="center" mb={5}>
                        <FaMoneyBillAlt size={28} color="#46ef75"/>
                        <Text ml={3}>R$ {data?.haircut?.price}</Text>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button
                        onClick={() => finishService()}
                        bg="button.cta"
                        _hover={{ bg: "#FFb13e" }}
                        color="barber.400"
                        mr={3}
                    >   Finalizar serviço
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}