{% macro on_run_end(results) %}
  {% set ns = namespace(success=0, error=0, skipped=0) %}

  {% for res in results %}
    {{ log("result: " ~ res.status ~ " node: " ~ res.node.unique_id ~ " message: " ~ res.message, info=True) }}
    {% if res.status == "success" %}
      {% set ns.success = ns.success + 1 %}
    {% elif res.status == "error" %}
      {% set ns.error = ns.error + 1 %}
    {% elif res.status == "skipped" %}
      {% set ns.skipped = ns.skipped + 1 %}
    {% endif %}
  {% endfor %}

  {{ log("on_run_end  success: " ~ ns.success ~ " error: " ~ ns.error ~ " skipped: " ~ ns.skipped, info=True) }}
  {% if execute %}
    CREATE TABLE IF NOT EXISTS dbt_meta (last_run_at TIMESTAMP, success INT, error INT, skipped INT);
    INSERT INTO dbt_meta (last_run_at, success, error, skipped) 
      VALUES (NOW(), {{ ns.success }}, {{ ns.error }}, {{ ns.skipped }});
  {% endif %}

{% endmacro %}