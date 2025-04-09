function template_jsonBuildTemplate(updated_at, version) {
    return `{
    "build": {
        "latest_build": "${updated_at}",
        "version": "${version}"
    }
}`
}

module.exports = template_jsonBuildTemplate;