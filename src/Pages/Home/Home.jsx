import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
const Home = () => {
    const buttonWrapperStyle = "felx-wrap rounded-md shadow-sm p-4 min-w-[50%] justify-center gap-2";
    const buttonstyle = "rounded-xl bg-[#0D3D45] px-3 py-2 text-xs border border-[#69D8F7] text-[#69D8F7] hover:bg-[#69D8F7] hover:text-[#0D3D45]  hover:border-[#0D3D45]"
    const containerStyle = "text-center bg-[#1A1A1A] p-5 rounded-xl m-5 max-w-2xl min-w-lg min-w-64"
    return <div class="h-screen w-full flex flex-wrap items-center justify-center">
        <ButtonGroup title="Pick your genre" data={["a","b"]} buttonStyle={buttonstyle} buttonWrapperStyle={buttonWrapperStyle} containerStyle={containerStyle}/>
    </div>

}

export default Home;