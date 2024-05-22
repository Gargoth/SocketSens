<nav>
    <ul>
        <li>
            <a href="/">Home</a>
        </li>
        <li>
            <a href="/dashboard">Dashboard</a>
        </li>
        <li>
            <a href="/notifications">Notifications</a>
        </li>
    </ul>
</nav>

<slot />

<style>
    nav {
        display: flex;
    }
    ul {
        display: flex;
        list-style: none;
        margin-left: auto;
        margin-right: auto;
    }
    li {
        padding-inline: 5em;
    }
</style>