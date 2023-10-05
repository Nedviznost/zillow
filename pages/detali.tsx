import { HomeIcon, PhoneIcon } from "@heroicons/react/solid"
import Container from "src/components/atoms/Container"


const Detali = () => (
    <Container>
        <h1 className="text-2xl mb-12">Детали</h1>
        <p>Недвижност.мк е направена со цел полесно и попрегледен пристап до било каков тип на Недвижност во Република Македонија</p>
        <p>Доколку сте заинтересирани за подетални информации слободно контактирајте не на:</p>
        <div className="flex items-center p-2 "><PhoneIcon className="w-6 h-6 " /><p>  +389 70354455 </p></div>
        <div className="flex items-center p-2 ">  <HomeIcon className="w-6 h-6 " />  <p> Мајаковски 28 </p></div>


    </Container>
)

export default Detali