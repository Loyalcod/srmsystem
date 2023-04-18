<script>
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
    import Modal from "../components/Modal.svelte";
    import FormModal from "../components/FormModal.svelte";

    let src = './images/result2.jpeg';

    let showModal = false;
    const toggleModal = ()=>{
        showModal = !showModal
    }

    const prepareResult = (e) =>{
       let email = e.detail.email
       let regNo = e.detail.regNo
       
       if((!email || email.length === 0) || (!regNo || regNo.length === 0)){
        alert('fill in the missing spaces')
       }else{
        window.location.assign(window.location.href + `result/${email}/${regNo}`)
       }
    }
</script>


<Header on:click={toggleModal}/>

<Modal on:click={toggleModal} {showModal}>
    <FormModal on:resultInput={prepareResult}/>
</Modal>

<img src={src} alt="student result management system">

<Footer/>




<style>
    img{
        width: 100%;
        height: 75vh;
        display: block;
        object-fit:fill;
    }
</style>

