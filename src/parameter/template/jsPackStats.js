function template_jsPackStats(pack_name, pack_format, description, author, version, created_at) {
    return `// This package information configure in package: ${pack_name}.
var package = {
    pack_name: "${pack_name}",
    pack_format: ${pack_format},
    pack_description: "${description}",
    pack_author: "${author}",
    pack_version: "${version}",
    created_at: "${created_at}",
}`
}

module.exports = template_jsPackStats;