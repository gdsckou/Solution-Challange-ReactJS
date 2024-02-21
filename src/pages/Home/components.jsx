import styled from "styled-components";


export const Page = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #F2F3F4;
    width: 100vw;
    min-height: 100vh;
`;


export const Box = styled.div`
    background-color: #AAB7B8;
    border-radius: 5px;
`;

export const Container = styled.div`
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-template-rows: 1fr 2fr;
    
    width: 100%;
    height: 600px;

    gap: 1em;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
    gap: 1em;
`;


export const Title = (props) => {
    return (
        <div style={{display: "flex", alignItems: "center", gap: "1em"}}>
            <h1>
                {props.text}
            </h1>
            <div style={{height: "2px", width: "100%", backgroundColor: "#000"}}></div>
        </div>
    );
}