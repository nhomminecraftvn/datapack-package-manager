function template_jsonTickTemplate(pack_data) {
    return `{
    "replace": false,
    "values": [
        "${pack_data}:repeat"
    ]
}`
}

module.exports = template_jsonTickTemplate;