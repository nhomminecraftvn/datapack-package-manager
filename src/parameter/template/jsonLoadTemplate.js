function template_jsonLoadTemplate(pack_data) {
    return `{
    "replace": false,
    "values": [
        "${pack_data}:reload"
    ]
}`
}

module.exports = template_jsonLoadTemplate;