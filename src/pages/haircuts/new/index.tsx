import Head from "next/head";
import { Button, Flex, Heading, Text, Input } from "@chakra-ui/react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Sidebar } from "@/components/sidebar";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { setupAPIClient } from "@/services/api";
import { useEffect, useState } from "react";
import Router from "next/router";

interface NewHaircutProps {
    subscription: boolean;
    count: number;
}

export default function NewHaircut({ subscription, count }: NewHaircutProps) {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Verifica se o código está sendo executado no cliente
        if (typeof window !== "undefined") {
            const mediaQuery = window.matchMedia("(max-width: 500px)");
            setIsMobile(mediaQuery.matches);

            // Adiciona um event listener para detectar mudanças na largura da tela
            const handleChange = () => setIsMobile(mediaQuery.matches);
            mediaQuery.addEventListener("change", handleChange);

            // Limpeza do event listener quando o componente for desmontado
            return () => {
                mediaQuery.removeEventListener("change", handleChange);
            };
        }
    }, []);


    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    async function handleRegister() {
        if (name === "" || price === "") {
            return;
        }

        try {
            const aplClient = setupAPIClient();
            await aplClient.post("/haircut", {
                name: name,
                price: Number(price),
            });

            Router.push("/haircuts");

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Head>
                <title>Barber - Novo Corte</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Sidebar>
                <Flex direction='column' alignItems="flex-start" justifyContent="flex-start">
                    <Flex
                        direction={isMobile ? "column" : "row"}
                        w="100%"
                        align={isMobile ? "flex-start" : "center"}
                        mb={isMobile ? 4 : 0}
                    >
                        <Link href="/haircuts">
                            <Flex direction="row" alignItems="center" mr={4}>
                                <FiChevronLeft size={21} color="white" />
                                <Button bg="transparent" _hover={{ bg: "transparent" }} color="gray.100">Voltar</Button>
                            </Flex>
                        </Link>

                        <Heading
                            color="orange.900"
                            fontSize={isMobile ? "28px" : "2xl"}
                        >
                            Modelos de corte
                        </Heading>
                    </Flex>

                    <Flex
                        maxW="1024px"
                        bg="barber.400"
                        w="100%"
                        mx="auto"
                        align="center"
                        justify="center"
                        direction="column"
                        mt={5}
                        pb={10}
                        pt={10}
                    >
                        <Heading color="gray.100" fontSize={isMobile ? "22px" : "2xl"} mb={4}>Cadastrar Modelo</Heading>

                        <Flex w="100%" align="center" justify="center" mb={4}>
                            <Input
                                color="#FFF"
                                size="md"
                                placeholder="Nome do corte"
                                width="85%"
                                type="text"
                                bg="barber.900"
                                disabled={!subscription && count >= 3}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Flex>

                        <Flex w="100%" align="center" justify="center" mb={4}>
                            <Input
                                color="#FFF"
                                size="md"
                                placeholder="Valor do corte"
                                width="85%"
                                bg="barber.900"
                                type="text"
                                disabled={!subscription && count >= 3}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Flex>

                        <Button
                            onClick={handleRegister}
                            w="85%"
                            bg="button.cta"
                            _hover={{ bg: "orange.900" }}
                            mb={5}
                            disabled={!subscription && count >= 3}
                        >   Cadastrar
                        </Button>

                        {!subscription && count >= 3 && (
                            <>
                                <Flex direction="row" gap={2}>
                                    <Text color="gray.100">Você atingiu seu limite! </Text>
                                    <Link href="/planos">
                                        <Text color="#31F86A">Torne-se premium</Text>
                                    </Link>
                                </Flex>
                            </>
                        )}

                    </Flex>

                </Flex>
            </Sidebar>

        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    try {
        const apiClient = setupAPIClient(ctx);

        const response = await apiClient.get("/haircut/check");
        const count = await apiClient.get("/haircut/count");

        return {
            props: {
                subscription: response.data?.subscriptions?.status === "active" ? true : false,
                count: count.data,
            }
        }

    } catch (err) {
        console.log(err);

        return {
            redirect: {
                destination: "/dashboard",
                permanent: false,
            }
        }

    }
})