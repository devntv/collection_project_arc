export const mockData = {
    sku: {
        productID: 1234,
        productName: "Panadol Extra gsk",
        code: "ABCDE",
        sellerName: "MedX",
        slug: "-"
    },
    summary: [
        {
            title: "today",
            data: {
                impression: 100,
                view: 40,
                addToCart: 10,
                orderCount: 5,
                orderedQuantity: 10,
                orderedValue: 120000
            }
        },
        {
            title: "this_week",
            data: {
                impression: 100,
                view: 40,
                addToCart: 10,
                orderCount: 5,
                orderedQuantity: 10,
                orderedValue: 120000
            }
        },
        {
            title: "this_month",
            data: {
                impression: 100,
                view: 40,
                addToCart: 10,
                orderCount: 5,
                orderedQuantity: 10,
                orderedValue: 120000
            }
        },
        {
            title: "7_days",
            data: {
                impression: 100,
                view: 40,
                addToCart: 10,
                orderCount: 5,
                orderedQuantity: 10,
                orderedValue: 120000
            }
        },
        {
            title: "30_days",
            data: {
                impression: 100,
                view: 40,
                addToCart: 10,
                orderCount: 5,
                orderedQuantity: 10,
                orderedValue: 120000
            }
        }
    ],
    chart: [
        {
            label: "01/08",
            value: 100,
            impression: 100,
            view: 40,
            addToCart: 10,
            orderCount: 5,
            orderedQuantity: 10,
            orderedValue: 120000
        },{
            label: "02/08",
            value: 70,
            impression: 70,
            view: 20,
            addToCart: 10,
            orderCount: 5,
            orderedQuantity: 30,
            orderedValue: 2000000
        },{
            label: "03/08",
            value: 170,
            impression: 170,
            view: 40,
            addToCart: 15,
            orderCount: 8,
            orderedQuantity: 25,
            orderedValue: 4000000
        },{
            label: "04/08",
            value: 160,
            impression: 160,
            view: 40,
            addToCart: 10,
            orderCount: 12,
            orderedQuantity: 40,
            orderedValue: 1350000
        },{
            label: "05/08",
            value: 120,
            impression: 120,
            view: 45,
            addToCart: 12,
            orderCount: 18,
            orderedQuantity: 40,
            orderedValue: 1500000
        },{
            label: "06/08",
            value: 160,
            impression: 160,
            view: 40,
            addToCart: 20,
            orderCount: 11,
            orderedQuantity: 80,
            orderedValue: 1300000
        }
    ]
}

export default function Mock(){
    return <>No content</>
}