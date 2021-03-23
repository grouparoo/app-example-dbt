with customers as (

    select * from {{ ref('customers') }}

),

final as (

    select
        customer_id,
        email,
        first_name,
        language,
        lifetime_value,
        updated_at

    from customers

)

select * from final