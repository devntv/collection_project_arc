import {doWithLoggedInUser, renderWithLoggedInUser} from "@thuocsi/nextjs-components/lib/login";


export async function getServerSideProps(ctx) {
    return await doWithLoggedInUser(ctx, (ctx) => {
        return loadEventListData(ctx)
    })
}

export async function loadEventListData(ctx) {

}

export default function EventListPage(props) {
    return renderWithLoggedInUser(props, render)
}

function render({loggedInUserInfo}) {

}