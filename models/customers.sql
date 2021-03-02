with customers as (

    select
        id as customer_id,
        email,
        first_name,
        last_name,
        updated_at

    from users

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
        customers.customer_id,
        customers.email,
        customers.first_name,
        customers.last_name,
        customer_orders.first_order_date,
        customer_orders.most_recent_order_date,
        coalesce(customer_orders.number_of_orders, 0) as number_of_orders,
        coalesce(customer_orders.lifetime_value, 0) as lifetime_value,
        greatest(customer_orders.most_recent_order_date, customers.updated_at) as updated_at

    from customers

    left join customer_orders using (customer_id)

)

select * from final