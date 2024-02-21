import styled from "styled-components";


const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background-color: #F8F9F9;

    @media screen and (max-width: 768px) {
        #illustration-section {
            display: none;
        }

        & {
            grid-template-columns: 1fr;
        }
    }
`;


const Section = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;
    padding: ${props => props.padding};

    @media screen and (max-width: 768px) {
        & {
            padding: 1.5em;
        }
    }
`;

const Input = styled.input`
    padding: 10px;
    background: none;
    border: 1px solid #138D75;
    outline: none;
    border-radius: 5px;
`;


const Button = styled.button`
    background-color: #27AE60;
    border-radius: 5px;
    color: #fff;
    border: none;
    outline: none;
    padding: 10px;
`;


const Line = styled.div`
    height: 1px;
    width: 100%;
    background-color: black;
`;


const Image = styled.img`
    width: 60%;
    align-self: center;
`;


const SignUp = () => {

    return (
        <Page>
            <Section>
                <Input type="text" placeholder="E-mail" />
                <Input type="text" placeholder="Password" />
                <Input type="text" placeholder="Password again" />
                <Input type="text" placeholder="Phone Number" />
                <Button>
                    Let's begin!
                </Button>
                <Button>
                    I have account
                </Button>
            </Section>
            <Section>

            </Section>
        </Page>
    );
}
export default SignUp;