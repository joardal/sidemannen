const [major,minor]=process.versions.node.split('.').map(Number);
if(major<22||(major===22&&minor<13)){
 console.error(`Sidemannen requires Node >=22.13.0 (Node 24 recommended). Current: ${process.version}.`);
 console.error('No automatic Node upgrade is attempted. Switch Node version, then rerun the command.');
 process.exit(1);
}
