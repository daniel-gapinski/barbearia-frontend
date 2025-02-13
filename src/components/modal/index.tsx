import { 
    Text,
    Button,
    Flex,
    CloseButton,
 } from "@chakra-ui/react";
 import { FiUser, FiScissors } from "react-icons/fi";
 import { FaMoneyBillAlt } from "react-icons/fa";
import { ScheduleItem } from "@/pages/dashboard";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


 interface ModalInfoProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    data: ScheduleItem;
    finishService: () => Promise<void>;
 }

export function ModalInfo({ data, finishService, isOpen, onClose, onOpen }: ModalInfoProps) {
    return (

        <DialogRoot open={isOpen} onOpenChange={onClose}>
       
            <DialogContent bg="barber.900">
                <DialogHeader>
                    <Flex justify="space-between">
                        <DialogTitle>Próximo</DialogTitle>
                        <CloseButton onClick={onClose} />
                    </Flex>
                </DialogHeader>
                <DialogBody>
                    <Flex mb={5} direction="row" align="center" gap={2}>
                        <FiUser size={28} color="#FF813e" />
                        <Text fontSize={18} mt={3}>{data?.customer}</Text>
                    </Flex>

                    <Flex align="center" mb={5} gap={2}>
                        <FiScissors size={28} color="#FFF" />
                        <Text mt={3}>{data?.haircut?.name}</Text>
                    </Flex>

                    <Flex align="center" gap={2} mb={5}>
                        <FaMoneyBillAlt size={28} color="#46ef75" />
                        <Text mt={3}>R$ {data?.haircut?.price}</Text>
                    </Flex>
                </DialogBody>
                <DialogFooter>
                    <Button
                        onClick={finishService}
                        bg="button.cta"
                        _hover={{ bg: "#FFb13e" }}
                        color="barber.400"
                        ml={3}
                     >
                        Finalizar Serviço
                    </Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    )
}