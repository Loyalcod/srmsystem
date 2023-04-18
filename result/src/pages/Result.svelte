<script>
  import { onMount } from "svelte/internal";
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
  import Modal from "../components/Modal.svelte";
  import FormModal from "../components/FormModal.svelte";
  import Resultdetails from "../components/resultdetails.svelte";

  export let urlparams;
  let email = urlparams.email;
  let regNo = urlparams.regNo;
  let result = [];

  let score = 0;
  let percentage = 0;
  let totalScore = 0;

  let showModal = false;
  const toggleModal = () => {
    showModal = !showModal;
  };

  const prepareResult = (e)=>{
    let email = e.detail.email
    let regNo = e.detail.regNo
    if((!email || email.length === 0)|| (!regNo || regNo.length === 0)){
        alert('fill in the missing spaces')
    }else{
        let newUrl = new URL(window.location.href + `result/${email}/${regNo}`)
        let origin = newUrl.origin
        window.location.assign(origin + `/result/${email}/${regNo}`)
    }
  }



  onMount(async () => {
    try {
      let response = await fetch(
        `http://localhost:8000/result/${email}/${regNo}`
      );
      let data = await response.json();
      result = data;
      console.log(result);

      if(result[0].resultId.length !== 0){
        result[0].resultId.forEach(singleResult => {
            totalScore += 100
            score += singleResult.mark

        });
        percentage = (score/totalScore *100)
      }
      // console.log(response)
    } catch (error) {
      console.log(error);
    }
  });


</script>

<Header on:click={toggleModal} />

<Modal {showModal} on:click={toggleModal}>
  <FormModal on:resultInput={prepareResult}/>
</Modal>

<div class="container py-4">
  {#if result.length !== 0}
    {#if result !== `student result doesn't exist`}
      <p class="magin-0"><strong>Student Name:</strong> {result[0].stdName}</p>
      <p class="magin-0">
        <strong>Student Reg. No.:</strong> Mouau/cmp/17/{result[0].regNo}
      </p>
      <p class="magin-0">
        <strong>Student Class:</strong>
        {result[0].stdClass.className}
      </p>

      <h3 class="text-center">Result Details</h3>

      <table class="table table-strip text-center py-3">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Subject</th>
            <th>Mark</th>
          </tr>
        </thead>
        <tbody>
          {#each result[0]?.resultId as singleResult, i}
            <Resultdetails {singleResult} {i} />
          {/each}

          <tr>
            <td colspan="2"><strong>Total Mark</strong></td>
            <td><strong>{score}</strong>out of <strong>{totalScore}</strong></td>
          </tr>
          <tr>
            <td colspan="2"><strong>Percentage</strong></td>
            <td><strong>55%</strong></td>
          </tr>
        </tbody>
      </table>
      <a
        href="#"
        class="nav-link text-center"
        on:click={() => {
          window.print();
        }}>print</a
      >

      <a href="/" class="backHome text-decoration-none h5">Back Home</a>
    {:else}
      <h4 class="text-center">No record of such student</h4>
    {/if}
  {:else}
    <h4>Result is empty</h4>
  {/if}
</div>
<Footer />




<style>
  .container {
    margin: 7% auto;
    background: white;
    border-radius: 10px;
  }

  .magin-0 {
    padding: 2px;
    margin: 0px;
  }
</style>
