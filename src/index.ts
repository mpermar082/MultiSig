// src/index.ts
/**
 * Main entry point for MultiSig
 */

import { MultiSig } from './multisig';
import minimist from 'minimist';

// Define the expected command-line arguments
interface Args {
    verbose?: boolean;
    input?: string;
    output?: string;
}

// Parse command-line arguments
const args: Args = minimist(process.argv.slice(2), {
    boolean: ['verbose'],
    alias: {
        v: 'verbose',
        i: 'input',
        o: 'output'
    }
});

/**
 * Main execution function
 * @returns {Promise<void>} A promise that resolves when the execution is complete
 */
async function main(): Promise<void> {
    try {
        // Initialize the MultiSig application
        const app = new MultiSig({
            verbose: args.verbose || false
        });

        // Log a message to indicate that processing has started
        if (args.verbose) {
            console.log('Starting MultiSig processing...');
        }

        // Execute the application and capture the result
        const result = await app.execute();

        // Log a message to indicate that the results have been saved
        if (args.output) {
            console.log(`Results saved to: ${args.output}`);
        }

        // Log a success message and exit the process
        console.log('Processing completed successfully');
        process.exit(0);
    } catch (error) {
        // Log any errors that occur during execution and exit the process
        console.error('Error:', error);
        process.exit(1);
    }
}

// Check if this script is being run directly (i.e., not being imported)
if (require.main === module) {
    // If so, execute the main function
    main();
}