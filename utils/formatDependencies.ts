/**
 * formats dependencies object as { <label: version>, ... }
 * return a @Map structure of dependencies
 * */
export async function formatDependencies(dependencies: Object) {
    return Object.entries(dependencies).reduce(
        (map, [dependency, version]: [string, string]) => {
            map.set(dependency, version.replace('^', ''));
            return map;
        },
        new Map()
    );
}
