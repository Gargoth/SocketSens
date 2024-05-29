<script>
    import supabase from "$lib/index";
    import { onMount } from "svelte";

    let users = [];

    onMount(async () => {
        let { data, error } = await supabase.from("users").select("*");
        users = data;
        console.table(users) // pwede i-remove
    });

</script>

<table>
    <th>userID</th>
    <th>Given Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Contact Number</th>
    <th>Admin</th>
    <th>Active</th>
{#each users as user}
    <tr>
        <td>{user.userid}</td>
        <td>{user.givenname}</td>
        <td>{user.lastname}</td>
        <td>{user.email}</td>
        <td>{user.phonenumber}</td>
        <td>{#if user.isadmin}1{:else}0{/if}</td>
        <td>{#if user.isactive}1{:else}0{/if}</td>
    </tr>
{:else}
<p>No users found</p>
{/each}
</table>