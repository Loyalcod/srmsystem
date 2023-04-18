<script>
    import {createEventDispatcher} from 'svelte'

    let email;
    let regNo;

    let dispatcher = createEventDispatcher()

    let requestResult = ()=>{
        let formInput = {email,regNo}
        dispatcher('resultInput',formInput)
    }
    

</script>

<form on:submit|preventDefault={requestResult}>
    <h3 class="text-center">Result Checker</h3><br>

    <div class="form-group">
        <label for="">Email Address</label>
        <input type="email" bind:value={email} class="form-control">
    </div>
    <br>
    <div class="form-group">
        <label for="">Registration No.</label>
        <input type="number" bind:value={regNo} class="form-control">
    </div>
    <br>
    <button class="btn btn-primary">Submit</button>

   

</form>