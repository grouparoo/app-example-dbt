with customers as (

    select * from {{ ref('customers') }}

),

orders as (

    select
        id as order_id,
        user_id as customer_id,
        created_at as order_date,
        state as status,
        price

    from purchases

),

customer_orders as (

    select
        customer_id,
        min(order_date) as first_order_date,
        max(order_date) as most_recent_order_date,
        count(order_id) as number_of_orders,
        sum(price) as lifetime_value

    from orders

    group by 1

),


final as (

    select
        customer_id,
        email,
        first_name as fname,
        lifetime_value AS ltv,
        updated_at

    from customers

)

select * from final