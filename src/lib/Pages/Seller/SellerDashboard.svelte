<script>
    import SideMenu from "../../Components/SideMenu.svelte";
    import SellerOrders from "./SellerOrders.svelte";
</script>

<div class="seller-dashboard">
    <SideMenu />
    <div class="line" />
    <div class="body">
        <div class="orders">
            <h1>Orders</h1>
            <SellerOrders />
        </div>
        <div class="account-preview">
            <div class="stats">
                <div class="logo" />
                <h2>Seller name</h2>
                <div class="rating">
                    <i class="ri-star-fill" />
                    <span>{4.5}</span>
                </div>
                <div class="stat">Response rate <span>{12}%</span></div>
                <div class="stat">Response time <span>{1} hrs</span></div>
                <div class="stat">Delivered on time <span>{40}%</span></div>
                <div class="stat">Order completion<span>{20}%</span></div>
            </div>
            <div class="requests">
                <h2>
                    Recent requests
                    <a href="/">See all</a>
                </h2>
                <div class="chats">
                    <div class="chat">
                        <div class="userImg"></div>
                        <div>
                            <h3>Oussama hamdaui <span class="tag">12</span></h3>
                            <p>Thanks! I'll wait</p>
                        </div>
                    </div>
                    <div class="chat">
                        <div class="userImg"></div>
                        <div>
                            <h3>Oussama hamdaui <span class="tag">12</span></h3>
                            <p>Thanks! I'll wait</p>
                        </div>
                    </div>
                    <div class="chat">
                        <div class="userImg"></div>
                        <div>
                            <h3>Oussama hamdaui <span class="tag">12</span></h3>
                            <p>Thanks! I'll wait</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .seller-dashboard {
        display: flex;
        align-items: flex-start;
        :global(.seller-orders .head){
            position: sticky;
            top:0;
            background-color: var(--neutral-1);
            z-index: 9;
            padding-top: 1rem;
        }
        .line {
            width: 1px;
            align-self: stretch;
            background-color: var(--neutral-7);
            margin-left: -1px;
        }
        .body {
            padding-left: 1rem;
            padding-right: 2rem;
            margin-top: 2rem;
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            flex: 1;
        }
        .account-preview {
            position: sticky;
            top: 3rem;
            flex: 1;
            display: flex;
            flex-direction: column;
            margin-bottom: 2rem;
            .stats {
                display: flex;
                flex-direction: column;
                padding: 1rem;
                border: 1px solid var(--neutral-7);
                border-radius: 3px;
                .logo {
                    min-width: 70px;
                    min-height: 70px;
                    background-color: var(--neutral-4);
                    align-self: center;
                    border-radius: 70px;
                    margin-bottom: 1.4rem;
                }
                .stat {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    span {
                        font-weight: 700;
                    }
                }
                h2 {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.1rem;
                }
            }
            .requests {
                display: flex;
                flex-direction: column;
                border: 1px solid var(--neutral-7);
                border-radius: 3px;
                margin-top: 1rem;
                flex: 1;
                h2 {
                    display: flex;
                    font-size: 1.1rem;
                    justify-content: space-between;
                    align-items: baseline;
                    padding: 1rem;
                    a{
                        font-size: 0.8rem;
                        font-weight: 500;
                    }
                }
                .chats{
                    display: flex;
                    flex-direction: column;
                    margin-top: 1rem;
                    .chat{
                        display: flex;
                        gap: 0.5rem;
                        align-items: center;
                        padding: 1rem;
                        cursor: pointer;
                        &:hover{
                            background-color: var(--neutral-2);
                        }
                        div{
                            flex:1;
                        }
                        h3{
                            font-size: 1rem;
                            font-weight: 500;
                            display: flex;
                            align-items: flex-start;
                            justify-content: space-between;
                            .tag{
                                width: 20px;
                                height: 20px;
                                background-color: var(--red-4);
                                color: var(--red-10);
                                border: 1px solid var(--red-7);
                                border-radius: 30px;
                                font-size: 0.5rem;
                                font-weight: 900;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                        }
                        .userImg{
                            max-width: 35px;
                            max-height: 35px;
                            min-width: 35px;
                            min-height: 35px;
                            background-color: var(--neutral-4);
                            border-radius: 35px;
                            border: 1px solid var(--neutral-7);
                        }
                    }
                }
            }

            .rating {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 2rem;
                i {
                    color: var(--orange-10);
                }
            }
        }
        .orders {
            h1 {
                margin-bottom: 1rem;
            }
            flex: 3;
        }
    }
    @media (min-width: 300px) and (max-width: 1100px) {
        .seller-dashboard {
            .body {
                flex-direction: column-reverse;
                .orders {
                    width: 100%;
                }
                .account-preview {
                    width: 100%;
                    position: relative;
                    flex-direction: row;
                    align-items: flex-start;
                    gap:2rem;
                    .stats{
                        flex: 1;
                        align-self: stretch;
                    }
                    .requests{
                        margin-bottom: 0;
                        margin-top: 0;
                        align-self: stretch;
                    }
                }
            }
        }
    }
    @media (min-width: 300px) and (max-width: 650px) {
        .seller-dashboard {
            .body {
                .account-preview {
                    width: 100%;
                    flex-direction: column;
                }
            }
        }
    }
    @media (min-width: 300px) and (max-width: 561px){
        .body{
            padding-left:2rem !important;
        }
    }
    @media (min-width: 300px) and (max-width: 801px){
        :global(.seller-orders .head){
            top: 4rem !important;
        }
    }
</style>
